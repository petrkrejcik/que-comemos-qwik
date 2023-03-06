import { doc } from "firebase/firestore"
import getFirebase from "~/lib/firebase/getFirebase"
import getFirestore from "~/lib/firebase/getFirestore"

export const getWeekPlan = async (groupId: string, weekId: string)=>{
  await getFirebase() // TODO: make it unnecessary
  return doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId)
}