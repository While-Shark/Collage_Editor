import 'package:flutter/material.dart';

/// 背景类型：纯色、渐变、图案、图片
enum BackgroundType { color, gradient, pattern, image }

/// 拼图中的单张图片模型
class CollageImage {
  final String id;
  final String url; // 图片路径或网络地址
  final Offset position; // 图片偏移位置
  final double scale; // 缩放比例
  final double rotation; // 旋转角度
  final Map<String, double> filters; // 滤镜参数 (亮度、对比度等)

  CollageImage({
    required this.id,
    required this.url,
    this.position = Offset.zero,
    this.scale = 1.0,
    this.rotation = 0.0,
    this.filters = const {
      'brightness': 1.0,
      'contrast': 1.0,
      'saturation': 1.0,
      'grayscale': 0.0,
      'sepia': 0.0,
    },
  });

  CollageImage copyWith({
    String? url,
    Offset? position,
    double? scale,
    double? rotation,
    Map<String, double>? filters,
  }) {
    return CollageImage(
      id: id,
      url: url ?? this.url,
      position: position ?? this.position,
      scale: scale ?? this.scale,
      rotation: rotation ?? this.rotation,
      filters: filters ?? this.filters,
    );
  }
}

/// 贴纸模型
class Sticker {
  final String id;
  final String type; // 'emoji' (表情) 或 'image' (图片贴纸)
  final String content; // 表情文本或图片地址
  final Offset position;
  final double scale;
  final double rotation;

  Sticker({
    required this.id,
    required this.type,
    required this.content,
    this.position = Offset.zero,
    this.scale = 1.0,
    this.rotation = 0.0,
  });

  Sticker copyWith({
    Offset? position,
    double? scale,
    double? rotation,
  }) {
    return Sticker(
      id: id,
      type: type,
      content: content,
      position: position ?? this.position,
      scale: scale ?? this.scale,
      rotation: rotation ?? this.rotation,
    );
  }
}

/// 拼图背景模型
class CollageBackground {
  final BackgroundType type;
  final dynamic value; // 可以是 Color, List<Color>, 或 String (图案/图片地址)

  CollageBackground({
    this.type = BackgroundType.color,
    this.value = Colors.white,
  });
}
