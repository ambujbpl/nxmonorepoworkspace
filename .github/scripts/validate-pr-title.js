module.exports = async function validatePrTitle({ github, context, core }) {
  const { owner, repo } = context.repo;
  const pull_number =
    context.payload.pull_request?.number || context.issue.number;
  const passingExamples = [
    'feat(auth): add user profile endpoint',
    'fix(auth): resolve frontend login redirect',
    'docs(API): update API documentation',
    'chore(deps): update dependencies',
    'refactor(core): improve code structure',
    'test(auth): add unit tests for auth module',
    'perf(API): optimize database queries',
    'style(UI): format code with Prettier',
  ];
  const failingExamples = [
    'Add user profile endpoint',
    'feature(auth): add user profile endpoint',
  ];

  if (!pull_number) {
    core.setFailed('Pull request number not found in the event payload.');
    return;
  }

  const { data: pullRequest } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const { title } = pullRequest;
  const pattern =
    /^(feat|fix|docs|chore|refactor|test|perf|style)(\(.+\))?: .+/;
  const formatMessage = [
    `PR title format: <type>(optional-scope): description`,
    'Allowed types: feat, fix, docs, chore, refactor, test, perf, style',
    `Passing examples: ${passingExamples.join(' | ')}`,
    `Failing examples: ${failingExamples.join(' | ')}`,
    `Check with ${owner} for more details on the PR title guidelines.`,
  ].join('\n');

  if (!title || typeof title !== 'string') {
    core.setFailed(`PR title is required.\n${formatMessage}`);
    return;
  }

  if (!pattern.test(title)) {
    core.error(`Current PR title: ${title}`);
    core.setFailed(`Invalid PR title.\n${formatMessage}`);
    return;
  }

  core.info(`PR title validation passed for: ${title}`);
  core.info(formatMessage);
};
