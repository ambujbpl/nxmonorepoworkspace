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
    const errorMessage = 'Pull request number not found in the event payload.';
    core.setFailed(errorMessage);
    return { valid: false, error: errorMessage };
  }

  const { data: pullRequest } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const { title } = pullRequest;
  const pattern =
    /^(feat|fix|docs|chore|refactor|test|perf|style)(\(.+\))?: .+/;
  const titleDetails = [
    `Repository: ${owner}/${repo}`,
    `PR Number: ${pull_number}`,
    `PR Title: ${title ?? 'N/A'}`,
  ].join('\n');
  const formatMessage = [
    'PR title format: <type>(optional-scope): description',
    'Allowed types: feat, fix, docs, chore, refactor, test, perf, style',
    `Passing examples: ${passingExamples.join(' | ')}`,
    `Failing examples: ${failingExamples.join(' | ')}`,
    `Check with ${owner} for more details on the PR title guidelines.`,
  ].join('\n');

  if (!title || typeof title !== 'string') {
    const errorMessage = `PR title is required.\n${titleDetails}\n${formatMessage}`;
    core.setFailed(errorMessage);
    return { valid: false, error: errorMessage, owner, repo, pullNumber: pull_number };
  }

  if (!pattern.test(title)) {
    const errorMessage = `Invalid PR title.\n${titleDetails}\n${formatMessage}`;
    core.error(titleDetails);
    core.setFailed(errorMessage);
    return {
      valid: false,
      error: errorMessage,
      owner,
      repo,
      pullNumber: pull_number,
      title,
    };
  }

  const successMessage = `PR validated successfully for title: ${title}`;
  core.notice(successMessage);
  core.info(titleDetails);

  return {
    valid: true,
    owner,
    repo,
    pullNumber: pull_number,
    title,
    message: successMessage,
    location: 'Validate PR > Validate pull request title',
  };
};
