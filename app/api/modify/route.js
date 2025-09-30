// app/api/modify/[id]/route.js
import mysql from 'mysql2/promise';

export async function GET(request, { params }) {
  const { id } = params;

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',          // your password here
    database: 'test', // your DB name here
  });

  const [rows] = await db.query('SELECT * FROM new WHERE id = ?', [id]);

  await db.end();

  if (rows.length === 0) {
    return new Response(JSON.stringify({ message: 'Record not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(rows[0]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();

  console.log('Update request ID:', id);
  console.log('Update request body:', body);

  const { name, email, phone, course, dob, address } = body;

  if (!name || !email || !phone || !course || !dob || !address) {
    return new Response(
      JSON.stringify({ error: 'All fields are required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  try {
    // Optional: Check if email belongs to another record (to avoid duplicates)
    const [emailCheck] = await db.query('SELECT id FROM new WHERE email = ? AND id != ?', [email, id]);
    if (emailCheck.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Email already in use by another record.' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const query = `
      UPDATE new SET
        name = ?,
        email = ?,
        phone = ?,
        course = ?,
        dob = ?,
        address = ?
      WHERE id = ?
    `;

    const [result] = await db.query(query, [
      name,
      email,
      phone,
      course,
      dob,
      address,
      id,
    ]);

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: 'No record found to update' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Optionally fetch and return updated record
    const [updatedRows] = await db.query('SELECT * FROM new WHERE id = ?', [id]);

    return new Response(
      JSON.stringify({ message: 'Record updated successfully', data: updatedRows[0] }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Update error:', error);
    return new Response(
      JSON.stringify({ error: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await db.end();
  }
}