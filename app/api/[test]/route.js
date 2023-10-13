import fs from 'fs'
import path from 'path';

export async function GET(req, { params }) {
  console.log(params.test)
  let buff = Buffer(params.test, 'base64').toString('ascii');
  console.log(buff)
  var files = fs.readdirSync(path.join(process.cwd(), ...buff.split(" ")))

  return new Response(files)
}