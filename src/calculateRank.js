function iexpsf(x, lambda=1.) {
  return Math.exp(lambda * x);
}

function calculateRank({
  repos,
  commits,
  contributions,
  followers,
  prs,
  issues,
  stargazers,
}) {
  // value of lambdas should be equal to 1 / <average number per user>
  // see https://en.wikipedia.org/wiki/Exponential_distribution
  const REPOS_LAMBDA = 1 / 20, REPOS_WEIGHT = 1.;
  const COMMITS_LAMBDA = 1 / 10000, COMMITS_WEIGHT = 1.;
  const CONTRIBS_LAMBDA = 1 / 1000, CONTRIBS_WEIGHT = 1.;
  const FOLLOWERS_LAMBDA = 1 / 100, FOLLOWERS_WEIGHT = 1.;
  const PRS_LAMBDA = 1 / 300, PRS_WEIGHT = 1.;
  const ISSUES_LAMBDA = 1 / 100, ISSUES_WEIGHT = 1.;
  const STARS_LAMBDA = 1 / 400, STARS_WEIGHT = 1.;
  
  const TOTAL_WEIGHT = (
    REPOS_WEIGHT +
    COMMITS_WEIGHT +
    CONTRIBS_WEIGHT +
    FOLLOWERS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    STARS_WEIGHT
  );
  
  const rank = TOTAL_WEIGHT / (
    REPOS_WEIGHT * iexpsf(repos, REPOS_LAMBDA) +
    COMMITS_WEIGHT * iexpsf(commits, COMMITS_LAMBDA) +
    CONTRIBS_WEIGHT * iexpsf(contributions, CONTRIBS_LAMBDA) +
    FOLLOWERS_WEIGHT * iexpsf(followers, FOLLOWERS_LAMBDA) +
    PRS_WEIGHT * iexpsf(prs, PRS_LAMBDA) +
    ISSUES_WEIGHT * iexpsf(issues, ISSUES_LAMBDA) +
    STARS_WEIGHT * iexpsf(stargazers, STARS_LAMBDA)
  );

  const RANK_S_PLUS = 0.01;
  const RANK_S = 0.1;
  const RANK_A_PLUS = 0.25;
  const RANK_A = 0.50;
  const RANK_B_PLUS = 0.75;
  
  let level = "";

  if (rank < RANK_S_PLUS)
    level = "S+";
  else if (rank < RANK_S)
    level = "S";
  else if (rank < RANK_A_PLUS)
    level = "A+";
  else if (rank < RANK_A)
    level = "A";
  else if (rank < RANK_B_PLUS)
    level = "B+";
  else
    level = "B+";

  return { level, score: rank};
}

module.exports = calculateRank;
