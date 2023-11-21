import getMeals from "~/lib/queries/getMeals"
import { DEFAULT_USER } from "../../../cypress/fixtures/users"

describe('getMeals', () => {
  it('should return empty array for non-existent group id', async () => {
    expect(await getMeals('non-existent', 'lunch')).to.have.length(0)
  })

  it('should return sorted meals', async () => {
    const meals = await getMeals(DEFAULT_USER.groupId, 'lunch')
    expect(meals).to.have.length(7)
    expect(meals[0].name).to.equal('Cerdo')
    expect(meals[1].name).to.equal('Dorada')
  })
})