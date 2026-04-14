module.exports = async ({ github, context, core }) => {
  const title = context.payload.pull_request?.title || '';
  const pattern = /^(feat|fix|docs|chore|refactor|test|perf|style)(\(.+\))?:\s.+$/i;

  if (!pattern.test(title)) {
    core.setFailed(
      `Pull request title must follow the conventional format: "type(scope): description".\n\n` +
      `Allowed types: feat, fix, docs, chore, refactor, test, perf, style\n\n` +
      `Example: "feat(api): add health check"\n\n` +
      `Found: "${title}"`,
    );
  } else {
    core.info(`✓ PR title is valid: ${title}`);
  }
};
