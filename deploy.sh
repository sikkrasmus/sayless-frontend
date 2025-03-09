#!/bin/bash
# Manual deployment script for Sayless Frontend

set -e  # Exit on error

# Configuration
AWS_REGION="eu-west-1"
ECR_REPOSITORY="sayless-frontend"
ECS_SERVICE="sayless-frontend-service"
ECS_CLUSTER="sayless-application-cluster"
CONTAINER_NAME="sayless-frontend"
ECR_URI="273534795987.dkr.ecr.eu-west-1.amazonaws.com"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}=== Sayless Frontend Deployment ===${NC}"
echo "Region: $AWS_REGION"
echo "ECR Repository: $ECR_REPOSITORY"
echo "ECS Cluster: $ECS_CLUSTER"
echo "ECS Service: $ECS_SERVICE"
echo ""

# Check AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    exit 1
fi

# Check Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

# Login to ECR
echo -e "${YELLOW}Logging in to Amazon ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URI

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $ECR_REPOSITORY:latest .

# Tag the image
echo -e "${YELLOW}Tagging image...${NC}"
docker tag $ECR_REPOSITORY:latest $ECR_URI/$ECR_REPOSITORY:latest

# Push the image to ECR
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_URI/$ECR_REPOSITORY:latest

# Update the ECS service
echo -e "${YELLOW}Updating ECS service...${NC}"
aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --force-new-deployment --region $AWS_REGION

# Wait for deployment to complete
echo -e "${YELLOW}Waiting for deployment to complete...${NC}"
aws ecs wait services-stable --cluster $ECS_CLUSTER --services $ECS_SERVICE --region $AWS_REGION

# Check for running tasks
echo -e "${YELLOW}Checking for running tasks...${NC}"
TASKS=$(aws ecs list-tasks --cluster $ECS_CLUSTER --service-name $ECS_SERVICE --query 'taskArns' --output text --region $AWS_REGION)

if [ -z "$TASKS" ]; then
    echo -e "${RED}Warning: No running tasks found. Deployment might have issues.${NC}"
    exit 1
else
    echo -e "${GREEN}Deployment successful! Tasks are running.${NC}"
    
    # Get the load balancer URL
    echo -e "${YELLOW}Getting load balancer URL...${NC}"
    LB_ARN=$(aws elbv2 describe-target-groups --names sayless-frontend-tg --query 'TargetGroups[0].LoadBalancerArns[0]' --output text --region $AWS_REGION)
    LB_DNS=$(aws elbv2 describe-load-balancers --load-balancer-arns $LB_ARN --query 'LoadBalancers[0].DNSName' --output text --region $AWS_REGION)
    
    echo -e "${GREEN}Application is available at: http://$LB_DNS/${NC}"
fi 