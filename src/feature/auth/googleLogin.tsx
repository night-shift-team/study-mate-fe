import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        '877767008504-iq3dn2jdum3dhilejajhhotek0rdelts.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
});

export { handler as GET, handler as POST };
