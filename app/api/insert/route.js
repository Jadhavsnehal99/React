// app/api/insert/route.js
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const db = await createConnection();
    const body = await request.json();

    const { name, email, phone, course, dob, address } = body;

    if (!name || !email || !phone || !course || !dob || !address) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Test DB connection
    const [test] = await db.query('SELECT 1 + 1 AS solution');
    console.log('DB test query result:', test);

    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM new WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }

    // Insert record with error handling
    let result;
    try {
      [result] = await db.query(
        `INSERT INTO new (name, email, phone, course, dob, address) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, phone, course, dob, address]
      );
      console.log('Insert result:', result);
    } catch (insertError) {
      console.error('Insert DB error:', insertError);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    // Return the inserted record
    const [inserted] = await db.query('SELECT * FROM new WHERE id = ?', [result.insertId]);

    return NextResponse.json({ message: 'Insert successful', data: inserted[0] }, { status: 201 });

  } catch (error) {
    console.error('Insert Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}