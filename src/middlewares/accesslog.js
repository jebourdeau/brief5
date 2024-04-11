/**INSERT INTO comment (id, users_id, post_id, content, create_at)
VALUES (
    id:integer,
    users_id:integer,
    post_id:integer,
    'content:character varying',
    'create_at:timestamp without time zone'
  ); 
 * @param {import("express").Request} req 
 * @param {import("express").Response} _res
 * @param {Function} next
 */
export function accesslogMiddleware(req, _res, next) {
    const datetime = new Date().toISOString()
    console.log(`${datetime} - [${req.method}] ${req.path} - from ${req.ip}`)
    next()
}