/* eslint-disable @typescript-eslint/no-var-requires */
const SriPlugin = require('webpack-subresource-integrity');
// const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: createSecureHeaders({
  //         contentSecurityPolicy: {
  //           directives: {
  //             defaultSrc: [
  //               "'self'",
  //               'https://pagead2.googlesyndication.com',
  //               'https://googleads.g.doubleclick.net',
  //               'https://partner.googleadservices.com',
  //               'https://adservice.google.com.br',
  //               'https://adservice.google.com',
  //               'https://www.googletagservices.com',
  //               'https://tpc.googlesyndication.com',
  //               'https://www.google.com',
  //             ],
  //             styleSrc: ["'self'", "'unsafe-inline'"],
  //             styleSrcElem: [
  //               "'self'",
  //               "'unsafe-inline'",
  //               'https://fonts.googleapis.com',
  //             ],
  //             connectSrc: [
  //               "'self'",
  //               'http://localhost:3333',
  //               'ws://localhost:3333',
  //               'https://snake-online-dev.herokuapp.com',
  //               'ws://snake-online-dev.herokuapp.com',
  //               'https://pagead2.googlesyndication.com',
  //             ],
  //             fontSrc: [
  //               "'self'",
  //               "'unsafe-inline'",
  //               'https://fonts.googleapis.com',
  //               'https://fonts.gstatic.com',
  //             ],
  //             imgSrc: [
  //               "'self'",
  //               'data:',
  //               'https://pagead2.googlesyndication.com',
  //             ],
  //             baseUri: 'self',
  //             formAction: 'self',
  //             frameAncestors: true,
  //           },
  //         },
  //         frameGuard: 'deny',
  //         noopen: 'noopen',
  //         nosniff: 'nosniff',
  //         xssProtection: 'sanitize',
  //         forceHTTPSRedirect: [
  //           true,
  //           { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
  //         ],
  //         referrerPolicy: 'same-origin',
  //       }),
  //     },
  //   ];
  // },
  webpack(config) {
    config.output.crossOriginLoading = 'anonymous';
    config.plugins.push(
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha384'],
        enabled: process.env.NODE_ENV === 'development' ? false : true,
      })
    );

    return config;
  },
};
