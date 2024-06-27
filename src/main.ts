import { getInput, error, setFailed } from '@actions/core';
import request from 'request';

async function main() {
  try {
    const title: string | undefined = getInput('title', {
      required: false,
    });
    const color: string | undefined = getInput('color', {
      required: false,
    });
    const body: string | undefined = getInput('body', { required: false }) || undefined;
    const jsonContent: string | undefined = getInput('json-content', { required: false }) || undefined;
    const webhook: string = getInput('webhook', { required: true });
    if (body) {
      sendTeamsNotification(webhook, {
        '@context': 'http://schema.org/extensions',
        '@type': 'MessageCard',
        title,
        text: body,
        themeColor: color,
      });
    } else if (jsonContent) {
      sendTeamsNotification(webhook, jsonContent);
    } else {
      setFailed('Either body or json-content must be provided!');
    }
  } catch (err) {
    if (err instanceof Error) {
      error('Sending a message to Microsoft Teams failed');
      setFailed(err.message);
    } else if (error !== undefined) {
      setFailed(err?.toString() ?? 'Unknown error');
    }
  }
}

async function sendTeamsNotification(webhook: string, jsonContent: any) {
  request(webhook, {
    method: 'POST',
    body: jsonContent,
  });
}

main();
