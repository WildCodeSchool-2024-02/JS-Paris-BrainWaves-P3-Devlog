create table user (
  id int primary key auto_increment not null,
  username varchar(50) not null,
  email varchar(100) not null unique,
  password varchar(80) not null,
  is_admin TINYINT not null default 0
);

create table team (
  id int primary key auto_increment not null,
  team_name varchar(255) not null
);

create table project (
  id int primary key auto_increment not null,
  name varchar(50) not null,
  team_id int,
  foreign key (team_id) references team(id)
);

create table task (
  id int primary key auto_increment not null,
  name varchar(50) not null,
  description varchar(250),
  is_archived TINYINT not null default 0,
  project_id int not null,
  team_id int not null,
  foreign key (project_id) references project(id),
  foreign key (team_id) references team(id)
);

create table user_has_team(
  user_id int,
  team_id int,
  primary key (user_id, team_id),
  foreign key (user_id) references user(id),
  foreign key (team_id) references team(id)
);

create table user_has_task(
  user_id int,
  task_id int,
  primary key (user_id, task_id),
  foreign key (user_id) references user(id),
  foreign key (task_id) references task(id)
);
