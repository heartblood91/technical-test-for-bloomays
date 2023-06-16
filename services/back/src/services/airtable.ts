import Airtable, { Records, FieldSet } from 'airtable'

const baseId = process.env.BLOOMAYS_AIRTABLE_BASE_ID ?? ''
const apiKey = process.env.BLOOMAYS_AIRTABLE_TOKEN ?? ''

const base = new Airtable({ apiKey }).base(baseId)

interface MissionInputType extends FieldSet {
  id: number
  label: string
  missionType: string
  beginDate: string
  endDate: string
  'freelance-id': Array<string>
  'freelance-firstname': Array<string>
  'freelance-lastname': Array<string>
  'freelance-email': Array<string>
}

type MissionOutputType = {
  id: number
  label: string
  missionType: string
  beginDate: string
  endDate: string
  freelance: {
    id: number
    firstname: string
    lastname: string
    email: string
  }
}

const isValidMission = (obj: FieldSet): obj is MissionInputType => {
  return (
    'id' in obj &&
    'label' in obj &&
    'missionType' in obj &&
    'beginDate' in obj &&
    'endDate' in obj &&
    'freelance-id' in obj &&
    'freelance-firstname' in obj &&
    'freelance-lastname' in obj &&
    'freelance-email' in obj
  )
}

const getAllMissions = async () => {
  const tableName = 'bloomays_missions'
  return new Promise((resolve, reject) => {
    base(tableName)
      .select()
      .all((err: Error | null, records: Records<FieldSet> | undefined) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          const missions: Array<MissionOutputType> =
            records
              ?.filter((record) => isValidMission(record.fields))
              ?.map((record) => {
                const fields = record.fields as unknown as MissionInputType
                return {
                  id: fields.id,
                  label: fields.label,
                  missionType: fields.missionType,
                  beginDate: fields.beginDate,
                  endDate: fields.endDate,
                  freelance: {
                    id: parseInt(fields['freelance-id'][0] ?? 0, 10),
                    firstname: fields['freelance-firstname'][0],
                    lastname: fields['freelance-lastname'][0],
                    email: fields['freelance-email'][0]
                  }
                }
              }) ?? []
          resolve(missions)
        }
      })
  })
}

export default {
  getAllMissions
}
