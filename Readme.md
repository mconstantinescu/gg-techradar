# Gunvor Group Technology Radar

This is the Gunvor Group technology radar content repository.

Based on the [AOE Technology Radar](https://github.com/AOEpeople/aoe_technology_radar) framework (upstream dependency).

## Content Guidelines

New blips should be tagged. The following tags are currently established:

* architecture
* security
* devops
* frontend
* agile
* coding
* quality assurance
* ci/cd
* ux/ui
* documentation

e.g. use like this:

```md
tags: [devops, security]
```

## Development

### Build the radar

```
npm i
npm run serve
```

Then open here: <http://localhost:3000/techradar>

### Build the radar with static files

```
npm i
npm run build
```
