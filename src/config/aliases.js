const aliases = (prefix = `src`) => ({
  "@components": `${prefix}/components`,
  views: `${prefix}/views`,
  games: `${prefix}/games`,
  "@images": `${prefix}/assets/images`,
  "@assets": `${prefix}/assets`,
  "@config": `${prefix}/config`,
  "@hooks": `${prefix}/hooks`,
  "@utils": `${prefix}/utils`,
  "@colors": `${prefix}/utils/colors.scss`,
  "@apis": `${prefix}/apis`,
  stores: `${prefix}/stores`,
  "@index": `${prefix}/index`,
  "@routes": `${prefix}/routes`,
});

module.exports = aliases;
