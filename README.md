# Teacher-Management-App
Fungsi utama aplikasi ini: <br>
1. Mempermudah management data guru dan murid.
2. Mempermudah akses informasi murid bagi guru.

Fungsi tambahan + MVP : <br>
1. Memberikan akses kepada wali kelas untuk informasi murid2nya.
2. mempermudah proses upload & download materi catatan atau materi tugas.


# Development

## Release 0 - Database, Model,and Migration
- pembuatan database menggunakan postgreSQL dengan nama database <b>teacher_app</b>
- pembuatan model <b> Teacher </b> yaitu:

| Column        | Data Type     | Constraints   |
| ------------- |:-------------:| -----:        |
|id             | VARCHAR       | Serial        |
|firstName      | VARCHAR       | NOT NULL      |
|lastName       | VARCHAR       | NOT NULL      |
|email          | VARCHAR       | NOT NULL      |
|imageUrl       | VARCHAR       | -             |
|phoneNumber    | VARCHAR       | NOT NULL      |

- pembuatan model <b> Student </b> yaitu:

| Column        | Data Type     | Constraints   |
| ------------- |:-------------:| -----:        |
|id             | VARCHAR       | Serial        |
|firstName      | VARCHAR       | NOT NULL      |
|lastName       | VARCHAR       | NOT NULL      |
|dateOfBirth    | DATE          | NOT NULL      |
|email          | VARCHAR       | NOT NULL      |
|imageUrl       | VARCHAR       | -             |
|phoneNumber    | VARCHAR       | NOT NULL      |

-pembuatan model <b> Subject </b> yaitu:

| Column        | Data Type     | Constraints   |
| ------------- |:-------------:| -----:        |
|id             | VARCHAR       | Serial        |
|subjectName    | VARCHAR       | NOT NULL      |

- 1 <b> guru </b> mengajar 1 <b> subject </b>
- 1 <b> student  </b> belajar banyak <b> subject </b>, 1 <b> subject </b> punya banyak <b> student </b>
- Migrate dengan sequelize, define foreignKey (namanya ada di ERD)


#

## Release 1 - Setting Routes
- menggunakan express, EJS, sequelize (aksesnya nanti aja pas implementasi login)

| Method        | Routes        | Tujuan                                     | Akses |
| ------------- |:-------------:| -----:                                     |-------:
|GET            | /             | Serial                                     | all
|GET            | /teachers      | list semua teacher                        | student & teacher
|GET            | /teachers/:teacherId          | detail teacher per ID           | student & teacher
|GET            | /teachers/:teacherId/edit     | edit teacher detail           | teacher
|GET            | /students      | list semua student                        |  teacher
|GET            | /students/:studentsId          | detail student per ID           | student & teacher
|GET            | /students/:studentsId/edit     | edit student detail           | teacher
|GET            | /subjects      | list semua subject                        | student
|email          | /subjects/:subjectId/ | list detail subject | student

dan lain2nya nanti... 


