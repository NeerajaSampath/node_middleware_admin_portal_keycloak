// @Library('jenkins-library') _

// pipeline {
//   agent {
//     kubernetes(k8sAgent(resourceType: 'large', appType: 'NODE'))
//   }
//   stages {
//     stage('NPM Install') {
//       steps {
//         container('m2p-base-build') {
//           installNpm(env.WORKSPACE)
//              }
//          }
//     }
//     stage('NPM Build') {
//       steps {
//         container('m2p-base-build') {
//           buildNpm(env.WORKSPACE)
//              }
//          }
//     }
//     stage('Sonarqube Analysis') {
//       steps {
//         container('m2p-base-build') {
//           sonarqubeAnalysis(env.WORKSPACE)
//           }
//         }
//       }
//     stage('Docker Build') {
//       steps {
//         container('m2p-base-kaniko') {
//           buildDocker('m2pfintech01/loyalty-program-middleware:' + env.GIT_COMMIT)
//         }
//       }
//     }
//     stage('Docker Push') {
//       steps {
//         container('m2p-base-build') {
//           pushDocker('m2pfintech01/loyalty-program-middleware:' + env.GIT_COMMIT)
//           }
//         }
//       }    
//   }
// }

@Library('jenkins-library') _

m2pNodePipeline {
    nodeVersion = '16'
    requireNpmBuild = 'false'
    isFrontendRepo = 'false'
    installNpmFlags = []
    imageName = 'loyalty-program-middleware'
    validation = 'relaxed'
    resourceType = 'mini'
    dockerfileVersion = 'node-16-alpine-v1.0.0'
}

