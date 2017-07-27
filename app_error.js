// Problem: We need a simple way to look at GitHub profile
// Solution: Use NodeJS to connect to GitHub API to get profile information and print out to the console

// TODO: Connect to the GitHub API
'use strict'
  const https = require('https')

  const username = 'kharizma'
  // Connect to the GitHub API (https://api.github.com/users/username)
  const options = {
   hostname: `api.github.com`,
   port: 443,
   path: `/users/${username}`,
   method: 'GET',
   headers: {
   'user-agent': 'node.js'
   }
  }
  let request = https.request(options, (response) => {
   console.log(response.statusCode)
   // TODO: Read the data
   let body = ""
   response.on('data', (data) => {
     body = body + data
   })

   let printData = (name, publicRepos, followers) => {
   console.log(`${name} owns ${publicRepos} repo(s) and has ${followers} follower(s)`)
  }

  response.on('end', () => {
    if (response.statusCode === 200) {
     let profile = JSON.parse(body)
     printData(profile.name, profile.public_repos, profile.followers)
    } else {
     printError({message: `Profile with username '${username}' not found. (${response.statusCode})` })
    }
  })
  })

  request.end()

  request.on('error', (e) => {
   console.error(e)
  })