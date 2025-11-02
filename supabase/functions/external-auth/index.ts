import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuthRequest {
  action: 'signup' | 'login' | 'logout' | 'get-session';
  emailOrUsername?: string;
  email?: string;
  password?: string;
  fullName?: string;
  username?: string;
  registrationCode?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const externalSupabaseUrl = Deno.env.get('EXTERNAL_SUPABASE_URL');
    const externalSupabaseKey = Deno.env.get('EXTERNAL_SUPABASE_ANON_KEY');

    if (!externalSupabaseUrl || !externalSupabaseKey) {
      throw new Error('External Supabase credentials not configured');
    }

    const externalSupabase = createClient(externalSupabaseUrl, externalSupabaseKey);
    const { action, emailOrUsername, email, password, fullName, username, registrationCode }: AuthRequest = await req.json();

    console.log('External auth action:', action);

    let result;
    
    switch (action) {
      case 'signup': {
        if (!email || !password) {
          throw new Error('Email and password required for signup');
        }

        const { data: signUpData, error: signUpError } = await externalSupabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username,
              registration_code: registrationCode,
            }
          }
        });

        if (signUpError) throw signUpError;

        // Store user in local database
        const localSupabaseUrl = Deno.env.get('SUPABASE_URL');
        const localSupabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const localSupabase = createClient(localSupabaseUrl!, localSupabaseKey!);

        if (signUpData.user) {
          await localSupabase.from('profiles').insert({
            user_id: signUpData.user.id,
            username: username || email.split('@')[0],
            full_name: fullName,
          });

          await localSupabase.from('user_roles').insert({
            user_id: signUpData.user.id,
            role: 'student',
          });
        }

        result = { user: signUpData.user, session: signUpData.session };
        break;
      }

      case 'login': {
        if (!emailOrUsername || !password) {
          throw new Error('Email/username and password required for login');
        }

        // Check if input is email or username
        const isEmail = emailOrUsername.includes('@');
        let loginEmail = emailOrUsername;

        // If username is provided, fetch the email from local database
        if (!isEmail) {
          const localSupabaseUrl = Deno.env.get('SUPABASE_URL');
          const localSupabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
          const localSupabase = createClient(localSupabaseUrl!, localSupabaseKey!);

          const { data: profile, error: profileError } = await localSupabase
            .from('profiles')
            .select('user_id')
            .eq('username', emailOrUsername)
            .single();

          if (profileError || !profile) {
            throw new Error('Invalid username or password');
          }

          // Get user email from external Supabase
          const { data: userData, error: userError } = await externalSupabase.auth.admin.getUserById(profile.user_id);
          
          if (userError || !userData.user?.email) {
            throw new Error('Invalid username or password');
          }

          loginEmail = userData.user.email;
        }

        const { data: loginData, error: loginError } = await externalSupabase.auth.signInWithPassword({
          email: loginEmail,
          password,
        });

        if (loginError) throw loginError;
        result = { user: loginData.user, session: loginData.session };
        break;
      }

      case 'logout': {
        // Client-side handles logout by clearing local storage
        // No server-side action needed
        result = { success: true };
        break;
      }

      case 'get-session': {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          result = { session: null, user: null };
          break;
        }

        const token = authHeader.replace('Bearer ', '');
        const { data, error } = await externalSupabase.auth.getUser(token);
        
        if (error) throw error;
        result = { user: data.user, session: { access_token: token } };
        break;
      }

      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('External auth error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
