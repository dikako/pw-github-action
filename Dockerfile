FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test project files
COPY . .

CMD ["bash"]
