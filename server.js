import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Importa cors
import { stat } from 'fs';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde este origen (tu frontend)
}));

// Configuración de Multer para guardar la imagen en la carpeta public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'images')); // Guardar directamente en public/images
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use(express.json());

// Ruta para recibir el archivo de la imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Imagen subida y guardada correctamente',
      imageUrl: `/images/${req.file.filename}`,
      success: true,
      
    });
  } else {
    res.status(400).json({ error: 'No se recibió archivo de imagen' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
