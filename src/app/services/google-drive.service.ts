// google-drive.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { loadGapiInsideDOM } from 'gapi-script';

declare const gapi: any;

@Injectable({ providedIn: 'root' })
export class GoogleDriveService {
  private gapiInitialized = false;

  async initGapi() {
    if (this.gapiInitialized) return;
    await loadGapiInsideDOM();
    return new Promise<void>((resolve) => {
      gapi.load('client:auth2', async () => {
        await gapi.client.init(environment.googleDrive);
        this.gapiInitialized = true;
        resolve();
      });
    });
  }

  async trySilentLogin() {
    await this.initGapi();

    const authInstance = gapi.auth2.getAuthInstance();

    if (authInstance.isSignedIn.get()) {
      return true; // Already signed in
    }

    try {
      await authInstance.signIn({ prompt: 'none' }); // Try silent login
      return true;
    } catch (e) {
      return false; // Silent login failed, probably first time
    }
  }

  async signIn() {
    await this.initGapi();

    const authInstance = gapi.auth2.getAuthInstance();

    // Check if the user is already signed in
    if (authInstance.isSignedIn.get()) {
      return; // No need to re-sign in
    }

    await authInstance.signIn(); // Only triggers popup if not already signed in
  }

  async listDocxFiles() {
    const res = await gapi.client.drive.files.list({
      q: "mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'",
      fields: 'files(id, name)',
      pageSize: 10,
    });
    return res.result.files;
  }

  async downloadDocxFile(fileId: string): Promise<ArrayBuffer> {
    const accessToken = gapi.auth.getToken().access_token;
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    const response = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });

    return response.arrayBuffer(); // raw binary file content
  }
}
