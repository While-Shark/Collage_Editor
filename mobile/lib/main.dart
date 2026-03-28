import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/collage_provider.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CollageProvider()),
      ],
      child: const CollageApp(),
    ),
  );
}

class CollageApp extends StatelessWidget {
  const CollageApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Collage Editor',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF7C4DFF),
          primary: const Color(0xFF7C4DFF),
          secondary: const Color(0xFFE1D5FF),
          surface: const Color(0xFFF8F7FF),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8F7FF),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: TextStyle(
            color: Color(0xFF1A1A1A),
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
          iconTheme: IconThemeData(color: Color(0xFF1A1A1A)),
        ),
        sliderTheme: SliderThemeData(
          activeTrackColor: const Color(0xFF7C4DFF),
          inactiveTrackColor: const Color(0xFFE1D5FF),
          thumbColor: const Color(0xFF7C4DFF),
          overlayColor: const Color(0xFF7C4DFF).withOpacity(0.2),
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
