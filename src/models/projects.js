import db from './db.js'

const getAllProjects = async () => {

    const query = `
        SELECT
            project_id,
            name,
            description,
            organization_id
        FROM public.project
        ORDER BY name;
    `

    const result = await db.query(query)

    return result.rows
}

export { getAllProjects }