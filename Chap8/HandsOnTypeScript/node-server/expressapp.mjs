import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('middleware #1');
  next();
});

app.use(router);
router.get('/api/v1/users', (req, res, next) => {
  const users = [
    {
      id: 1,
      name: 'Tom',
    },
    {
      id: 2,
      name: 'Jon',
    },
    {
      id: 3,
      name: 'Linda',
    },
  ];
  const { userid } = req.query;
  console.log(userid);
  const user = users.find((user) => user.id == userid);
  res.send(`User name is: ${user?.name}`);
});
router.post('/api/v1/groups', (req, res, next) => {
  const groups = [
    {
      id: 1,
      name: 'Admins',
    },
    {
      id: 2,
      name: 'Users',
    },
    {
      id: 3,
      name: 'Employees',
    },
  ];
  const { groupid } = req.body;
  console.log(groupid);
  const group = groups.find((group) => group.id == groupid);
  res.send(`Group name is: ${group?.name}`);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

const port = 8000;

app.listen(port, () => {
  console.log('Express Node server has loaded!');
});