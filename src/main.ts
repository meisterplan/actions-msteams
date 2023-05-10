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
    const body: string = getInput('body', { required: true });
    const webhook: string = getInput('webhook', { required: true });
    sendTeamsNotification(webhook, body, title, color);
  } catch (err) {
    if (err instanceof Error) {
      error('Sending a message to Microsoft Teams failed');
      setFailed(err.message);
    } else if (error !== undefined) {
      setFailed(err?.toString() ?? 'Unknown error');
    }
  }
}

async function sendTeamsNotification(webhook: string, body: string, title?: string, color?: string) {
  const data = {
    '@context': 'http://schema.org/extensions',
    '@type': 'MessageCard',
    title,
    text: body,
    themeColor: color,
  };
  request(webhook, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

main();
