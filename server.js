import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'wishes_data.txt');

app.use(cors());
app.use(express.json());

// 记录愿望的接口
app.post('/api/wish', (req, res) => {
  try {
    const { wish } = req.body;
    // 获取 IP，处理代理情况
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const time = new Date().toLocaleString('zh-CN', { hour12: false });
    
    // 格式化日志行
    const logEntry = `[${time}] IP:${ip} | Wish: ${wish}\n`;

    // 追加写入文件
    fs.appendFileSync(DATA_FILE, logEntry, 'utf8');
    
    console.log(`收到新愿望: ${wish} (来自 ${ip})`);
    res.json({ success: true, message: '愿望已送达' });
  } catch (error) {
    console.error('写入失败:', error);
    res.status(500).json({ success: false, message: '服务器开小差了' });
  }
});

app.listen(PORT, () => {
  console.log(`
  🎄 许愿服务已启动！
  -----------------------------------
  接口地址: http://localhost:${PORT}
  数据文件: ${DATA_FILE}
  -----------------------------------
  `);
});

