import express, { Application } from 'express';
import cors from 'cors';
import colorRoutes from './routes/ColorRoutes';
import blueprintRoutes from './routes/BlueprintRoutes';
import themeRoutes from './routes/ThemeRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api/colors', colorRoutes);
app.use('/api/blueprint', blueprintRoutes);
app.use('/api/theme', themeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
