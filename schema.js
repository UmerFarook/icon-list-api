import {buildSchema} from 'graphql';


const schema = buildSchema(`
    type Icons {
        id: ID
        name: String!
        defaultFontSize: Int
        color: String
        svgAvailable: Boolean
        sizesAvailable: [IconSizes]
    }
    
    type IconSizes {
        name:Sizes
        sizeInPX:String
    }
    
    enum Sizes {
        SM
        MD
        LG    
    }
    
    type Query {
         getIcons(id:ID): Icons
    }
    
    input IconsInput{
        id: ID
        name: String!
        defaultFontSize: Int
        color: String
        svgAvailable: Boolean
        sizesAvailable: [IconSizesInput]
    }
    
    input IconSizesInput {
        name:Sizes
        sizeInPX:String
    }
    
    type Mutation {
        setIcons(input:IconsInput): Icons
    }

`);

export  default schema;