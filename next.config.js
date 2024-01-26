const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = () => {
  if (PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_user: 'brettgalvez',
        mongodb_pass: 'brettgalvez',
        mongodb_cluster: 'database',
        mongodb_db: 'my-site',
      },
    }
  }
  return {
    env: {
      mongodb_user: 'brettgalvez',
      mongodb_pass: 'brettgalvez',
      mongodb_cluster: 'database',
      mongodb_db: 'my-site',
    },
  }
}
