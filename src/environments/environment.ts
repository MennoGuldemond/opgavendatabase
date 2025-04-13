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
  production: false,
  version: packageJson.version,
};
