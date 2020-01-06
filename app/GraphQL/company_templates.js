import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`

    
    extend type Query {
        company_templates(token:String!,company_id:ID!): [CompanyTemplate]
        company_template(token:String!,id:ID!): CompanyTemplate
    }

    type CompanyTemplate {
        id: ID!
        name: String
        tmp_type: Int
        tmp_data: String
    }
`

export const resolvers = {
    Query: {
        company_templates: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.company_templates.findAll({where:{company_id:args.company_id}})
            } else {

            }
        },
        company_template: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.company_templates.findByPk(args.id)
            } else {

            }
        },
    }
}