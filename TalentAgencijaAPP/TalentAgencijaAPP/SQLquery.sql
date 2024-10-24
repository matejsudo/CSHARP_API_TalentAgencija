﻿use master;
go
drop database if exists talent_agencija;
go
create database talent_agencija collate Croatian_CI_AS;
go

use talent_agencija;

create table agenti(
sifra int not null primary key IDENTITY (1,1),
ime varchar(20) not null,
prezime varchar(20) not null,
agentod datetime,
verificiran bit
);

create table korisnici(
sifra int not null primary key identity (1,1),
ime varchar(20) not null,
prezime varchar(20) not null,
profesija varchar(100),
datumrodenja datetime,
korisnikod datetime,
email varchar(50),
agent int
);

create table projekti(
sifra int not null primary key identity (1,1),
naziv varchar(100) not null,
vrijednostprojekta decimal,
produkcija varchar(50),
pocetakprojekta datetime,
krajprojekta datetime
);

create table korisnicinaprojektu(
korisnik int not null,
projekt int not null
);

alter table korisnici add foreign key (agent) REFERENCES agenti(sifra);
alter table korisnicinaprojektu add foreign key (korisnik) REFERENCES korisnici(sifra);
alter table korisnicinaprojektu add FOREIGN KEY (projekt) references projekti(sifra);

select * from agenti;

select * from korisnici;

select * from projekti;

select * from korisnicinaprojektu;
 
insert into agenti(ime,prezime) values
('Mirko', 'Birko'), ('Dinko', 'Parkov'),('Pero','Kvrgić');

insert into korisnici(ime, prezime, email) values
('Anka', 'Šumadinov', 'ankasum@gmail.com'),
('Senka', 'Pokrov', 'senkap@gmail.com'), 
('Igor','Balažić','igorbalazic11@gmail.com'),
('Damir','Bukvašević','damirbukvasevic@gmail.com'),
('Senka','Banjac','sbanjac88@gmail.com'),
('Igor','Brzica','igorbrzica1@gmail.com'),
('Ivan','Mesarić','mesaritchievan@gmail.com'),
('Mirko','Ereš','mirko.eres1@gmail.com'),
('Lea','Raguž','raguz.leaa@gmail.com'),
('Dominik  ','Daraždi','dominikdarazdi@gmail.com'),
('Dean','Vagner','deanvagner@yahoo.com'),
('Marko','Mudrovčić','markomudrovcic12@gmail.com'),
('Mario','Kušen','kusen.mario@gmail.com'),
('Leon','Jalovičar','ringerajacar@gmail.com'),
('Dražen','Kalazić','thekalazic@gmail.com'),
('Matej','Sudarić','matejsudo@gmail.com'),
('Antonijo','Šakić','a.sakic.1.g@gmail.com'),
('Nikola','Milić','nikk.mil@gmail.com'),
('Manuela','Slobođanac','manja496@gmail.com'),
('Srđan','Filipović','srdjanfilipovic991@gmail.com'),
('Goran','Matoš','goran.matos@a1.hr'),
('Igor','Tomić','i.tomic.babinski@gmail.com'),
('Borna','Štajduhar','bornastajduhar1999@gmail.com'),
('Ante','Filipović','ante.filipovic72@gmail.com'),
('Domagoj','Glavačević','glavacevic.d@gmail.com'),
('Lorena','Ostroški','lorena.ostroski2503@gmail.com'),
('Sanja','Boduljak','matkosanja@gmail.com'),
('Leon','Puhanić','leonpuhanic@gmail.com'),
('Danijel','Sačer','sacerdanijel@gmail.com');

insert into projekti(naziv, vrijednostprojekta, produkcija) values
('Reklama za Jamnicu', '500000.00', 'Antitalent'),
('Spot za Donkeyhot', '7000.00', 'Kinofilm'),
('Sapunica Villa Maria', '550000.00', 'NovaTV');

insert into korisnicinaprojektu(projekt, korisnik) values
(1,1), (1,4), (1,7), (1,8);