import packageJson from '../../package.json';

export const environment = {
  firebase: {
    projectId: 'opgavendatabase',
    appId: '1:791040557585:web:adc71e607e776cc743a7b0',
    storageBucket: 'opgavendatabase.firebasestorage.app',
    apiKey: 'AIzaSyDPIjbnSJ2iuYy_fF6RzkdXW0HPYa6BKI0',
    authDomain: 'opgavendatabase.firebaseapp.com',
    messagingSenderId: '791040557585',
    measurementId: 'G-MRCE80M34K',
  },
  googleDrive: {
    apiKey: 'AIzaSyDeXVSwmYe0vHfLbreq_LnG7TuUiiqIkjU',
    clientId: '1083195554631-5givkq8hsmroki2irc0afkclfh06a2pb.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.readonly',
  },
  ckeditor: {
    licenseKey:
      'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYxMjQ3OTksImp0aSI6Ijk2MjkxNDVkLTU2MmItNDA2Yi1hNTE1LWVjYTMzY2JkZjJjMSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6IjUyYjQyMjNlIn0.I4RWCEKbkWRB4Ic4RMA3SDytWS4pDGG5E1Fl3F3FxTcvawAJgkBJYTpAJU5XvLHcYcq9n9_C83IYFk9v0vXtqg',
  },
  production: false,
  version: packageJson.version,
};
