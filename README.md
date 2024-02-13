## Microsoft Teams

This action allows sending messages to Microsoft Teams Teams.

## Build

After changing the action's code, the action must be rebuilt and packaged via `yarn all` and the changes in the `dist` folder must be commited.

## Usage

### Pre-requisites

Create a workflow `.yml` file in your repositories `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs

- `title` - Title of the message (optional)
- `body` - Markddown body of the message
- `webhook` - Webhook of the Team

### Example workflow

```yaml
name: Sending Messages

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Send Message
        id: send-message
        uses: meisterplan/actions-msteams@v2
        with:
          title: Hello # optional
          color: '#01A6F0' #optional
          body: |
            This is a test message
            with *markdown*
            and multiple lines
          webhook: ${{ secrets.MY_SECRET_WEBHOOK_URL }}
```
