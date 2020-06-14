import { MemeList } from './MemeList';
import { Meme } from './Meme'
import { make_db } from './DatabaseHandler'
import * as sqlite from 'sqlite3';
import { ServerResponse } from 'http';
import { waitForDebugger } from 'inspector';

export const mList = new MemeList();

export const mostExpensive = [
  {'id': 10,
  'name': 'Gold',
  'price': 1000,
  'url': 'https://i.redd.it/h7rplf9jt8y21.png'},
    {'id': 9,
    'name': 'Platinum',
    'price': 1100,
    'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},
    {'id': 8,
    'name': 'Elite',
    'price': 1200,
    'url': 'https://i.imgflip.com/30zz5g.jpg'}
]
const db = make_db();

mostExpensive.forEach( async (m) => {
  try {
    const meme: Meme = new Meme(m.id, m.name, m.url);
    meme.addPrice(m.price, 'admin');
    await mList.addMeme(db, meme);
  } catch(err) {
    throw err;
  }
})

export const headerMeme = new Meme(7, 'www', 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/99064183_2958683650874355_4126039502034567168_n.jpg?_nc_cat=111&_nc_sid=110474&_nc_ohc=Tg_cXzJMqzkAX8eXnIa&_nc_ht=scontent-waw1-1.xx&oh=edfe5f1f3f341cab45805435012023ee&oe=5EEC8DB2')
headerMeme.addPrice(10, 'admin')

export function get_meme (db: sqlite.Database,idStr: string): Promise<Meme | undefined> {
    const idNum: number = +idStr;
    if(!isNaN(idNum)){
      return mList.getMeme(db, idNum)
    }
}
