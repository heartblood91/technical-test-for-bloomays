export type BloomerType = {
  id: number
  firstname: string
  lastname: string
  beginMission: string
  endMission: string
}

export type MissionType = {
  id: number
  label: string
  beginDate: string
  endDate: string
  missionType: string
  freelance: {
    id: number
    firstname: string
    lastname: string
    email: string
  }
}
