const apiBaseUrl  = Cypress.config('ApiBaseUrl');
describe('api tests', () => {
    it("returns an empty list of todo items", () => {
      cy.request("GET", `${apiBaseUrl}/todoItems`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.null;
        expect(response.body).to.deep.equal([])
      })
    })


    it("create a new to do items", () => {
      let requestBody = {  description: 'To Do Item1'}
      cy.request("Post", `${apiBaseUrl}/todoItems`, requestBody).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.not.be.null;
      })
    })

    it("create a new to do items, with empty description , should return bad request", () => {
      cy.request({method:"Post", url:`${apiBaseUrl}/todoItems`, body:{  description: null}, failOnStatusCode: false}).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors.Description[0]).to.eq('Description field can not be empty');
      })
    })

    it("create the item with same description and it should return conflict response", () => {

      cy.request({method:"Post", url:`${apiBaseUrl}/todoItems`,  body :{  description: 'To Do Item1'}, failOnStatusCode: false}).then((response) => {
        expect(response.status).to.eq(409)
        expect(response.body).to.eq('A todo item with description already exists')
      })
    })

    it("create a new to do items, and then get that item", () => {
      let requestBody = {  description: 'To Do Item2'}
      cy.request("Post", `${apiBaseUrl}/todoItems`, requestBody).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.not.be.null;
        const todoItemId = response.body;
        console.log(`Created Id is ${todoItemId}`)
        cy.request("GET", `${apiBaseUrl}/todoItems/${todoItemId}`).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body).to.not.be.null;
          expect(getResponse.body).to.deep.eq({
            id: todoItemId,
            description: requestBody.description,
            isCompleted: false
          })
        })
      })
    })

    it("returns an list of todo items", () => {
      cy.request("GET", `${apiBaseUrl}/todoItems`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.null;
        expect(response.body).to.have.length(2);
      })
    })

    it("get to do items with id (id not exists), should return 404( Not found)", () => {
      const todoItemId = '00000000-0000-0000-0000-000000000000';
        cy.request({method:"GET", url:`${apiBaseUrl}/todoItems/${todoItemId}`, failOnStatusCode: false}).then((response) => {
          expect(response.status).to.eq(404);

      })
    })

    it("update the to do item", () => {
      let requestBody = {  description: 'To Do Item3'}

      cy.request("Post", `${apiBaseUrl}/todoItems`, requestBody).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.not.be.null;
        const todoItemId = response.body;

        const putRequestBody = {
          id: `${todoItemId}`,
          description: 'updatedDescription',
          isCompleted: true
        }
        cy.request("PUT", `${apiBaseUrl}/todoItems/${todoItemId}`, putRequestBody).then((putResponse) => {
          expect(putResponse.status).to.eq(204);
        })
          // now get the updated item

          cy.request("GET", `${apiBaseUrl}/todoItems/${todoItemId}`).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body).to.not.be.null;
            expect(getResponse.body).to.deep.eq({
              id: todoItemId,
              description: putRequestBody.description,
              isCompleted: putRequestBody.isCompleted
            })
          })
    })     
    })

    it("bad request to update the to do item", () => {
      let requestBody = {  description: 'To Do Item Not Update'}

      cy.request("Post", `${apiBaseUrl}/todoItems`, requestBody).then((response) => {
        expect(response.status).to.eq(201);
        const todoItemId = response.body;

        const putRequestBody = {
          description: 'updatedDescription',
          isCompleted: true
        }
        cy.request({method:"PUT", url: `${apiBaseUrl}/todoItems/${todoItemId}`, body:putRequestBody, failOnStatusCode : false}).then((putResponse) => {
          expect(putResponse.status).to.eq(400);
          expect(putResponse.body).to.eq('You are trying to update the wrong todo item');
        })
    })     
    })

  })
