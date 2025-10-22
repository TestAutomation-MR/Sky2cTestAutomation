import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Global teardown tasks
  console.log('🧹 Starting global teardown...');
  
  // You can add cleanup tasks here
  // Example: Clean up test data, close connections, etc.
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown; 