/**
 * Environment Variables Configuration
 * Type-safe access to environment variables
 */

interface AppEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

class EnvConfig {
  private env: AppEnv;

  constructor() {
    this.env = this.validateEnv();
  }

  private validateEnv(): AppEnv {
    const requiredVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_PUBLISHABLE_KEY',
    ] as const;

    const missing = requiredVars.filter(
      (key) => !import.meta.env[key]
    );

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }

    return {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    };
  }

  get supabaseUrl(): string {
    return this.env.VITE_SUPABASE_URL;
  }

  get supabaseAnonKey(): string {
    return this.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  }

  get isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  get isProduction(): boolean {
    return import.meta.env.PROD;
  }
}

export const env = new EnvConfig();
