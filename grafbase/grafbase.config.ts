import { g, config, auth } from '@grafbase/sdk';

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  cocktails: g.relation(() => Cocktail).list().optional(),
}).auth((rules) => {
  rules.public().read()
})

// @ts-ignore
const Cocktail = g.model('Cocktail', {
  title: g.string().length({ min: 3 }),
  content: g.string(), 
  recipe: g.string(), 
  description: g.string(), 
  image: g.url(),
  rating:g.int(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
})

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
})