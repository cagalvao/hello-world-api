'use strict'

async function getMembersFromDb () {
  const members = await [
    {
      id: 1,
      name: 'Adriano Martins'
    },
    {
      id: 2,
      name: 'Bruno Lima'
    },
    {
      id: 3,
      name: 'Cássio Galvão'
    },
    {
      id: 4,
      name: 'Davi Carlos'
    },
    {
      id: 5,
      name: 'Franklin Domingues'
    },
    {
      id: 6,
      name: 'Renan Melo'
    },
    {
      id: 7,
      name: 'Renata Cunha'
    }
  ]

  return members
}

async function getMemberFromDb (memberId) {
  const members = await getMembersFromDb()

  return members.find(m => m.id === parseInt(memberId))
}

module.exports = {
  getMembersFromDb,
  getMemberFromDb
}
