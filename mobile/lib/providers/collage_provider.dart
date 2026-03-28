import 'package:flutter/material.dart';
import '../models/collage_state.dart';
import 'dart:collection';

/// 拼图编辑器的状态类
class CollageState {
  final int layout; // 布局类型 (1, 2, 3, 4, 6, 9)
  final List<CollageImage?> images; // 图片列表
  final List<Sticker> stickers; // 贴纸列表
  final CollageBackground background; // 背景设置
  final int? selectedIndex; // 当前选中的图片索引
  final double borderWidth; // 外边距
  final double cornerRadius; // 圆角
  final double spacing; // 图片间距

  CollageState({
    this.layout = 1,
    this.images = const [null],
    this.stickers = const [],
    CollageBackground? background,
    this.selectedIndex,
    this.borderWidth = 12.0,
    this.cornerRadius = 24.0,
    this.spacing = 16.0,
  }) : background = background ?? CollageBackground();

  /// 创建状态副本，用于不可变状态更新
  CollageState copyWith({
    int? layout,
    List<CollageImage?>? images,
    List<Sticker>? stickers,
    CollageBackground? background,
    int? selectedIndex,
    bool clearSelection = false,
    double? borderWidth,
    double? cornerRadius,
    double? spacing,
  }) {
    return CollageState(
      layout: layout ?? this.layout,
      images: images ?? this.images,
      stickers: stickers ?? this.stickers,
      background: background ?? this.background,
      selectedIndex: clearSelection ? null : (selectedIndex ?? this.selectedIndex),
      borderWidth: borderWidth ?? this.borderWidth,
      cornerRadius: cornerRadius ?? this.cornerRadius,
      spacing: spacing ?? this.spacing,
    );
  }
}

/// 拼图编辑器的状态管理类
class CollageProvider with ChangeNotifier {
  CollageState _state = CollageState();
  final List<CollageState> _undoStack = []; // 撤销栈
  final List<CollageState> _redoStack = []; // 重做栈

  CollageState get state => _state;
  bool get canUndo => _undoStack.isNotEmpty;
  bool get canRedo => _redoStack.isNotEmpty;

  /// 设置当前选中的图片索引
  void setSelectedIndex(int? index) {
    _state = _state.copyWith(selectedIndex: index, clearSelection: index == null);
    notifyListeners();
  }

  /// 重置所有样式到默认值
  void resetStyles() {
    _pushToUndo();
    _state = _state.copyWith(
      borderWidth: 12.0,
      cornerRadius: 24.0,
      spacing: 16.0,
    );
    notifyListeners();
  }

  /// 设置全局样式
  void setStyle({double? borderWidth, double? cornerRadius, double? spacing}) {
    _pushToUndo();
    _state = _state.copyWith(
      borderWidth: borderWidth,
      cornerRadius: cornerRadius,
      spacing: spacing,
    );
    notifyListeners();
  }

  /// 更新指定图片的滤镜
  void updateImageFilters(int index, Map<String, double> filters) {
    _pushToUndo();
    List<CollageImage?> newImages = List.from(_state.images);
    if (newImages[index] != null) {
      final currentFilters = Map<String, double>.from(newImages[index]!.filters);
      currentFilters.addAll(filters);
      newImages[index] = newImages[index]!.copyWith(filters: currentFilters);
    }
    _state = _state.copyWith(images: newImages);
    notifyListeners();
  }

  /// 将滤镜应用到所有图片
  void applyFiltersToAll(Map<String, double> filters) {
    _pushToUndo();
    List<CollageImage?> newImages = _state.images.map((img) {
      if (img == null) return null;
      final currentFilters = Map<String, double>.from(img.filters);
      currentFilters.addAll(filters);
      return img.copyWith(filters: currentFilters);
    }).toList();
    _state = _state.copyWith(images: newImages);
    notifyListeners();
  }

  /// 移除指定位置的图片
  void removeImage(int index) {
    _pushToUndo();
    List<CollageImage?> newImages = List.from(_state.images);
    newImages[index] = null;
    _state = _state.copyWith(images: newImages, clearSelection: true);
    notifyListeners();
  }

  /// 将当前状态推入撤销栈
  void _pushToUndo() {
    _undoStack.add(_state);
    _redoStack.clear();
    if (_undoStack.length > 50) _undoStack.removeAt(0);
  }

  /// 设置拼图布局
  void setLayout(int layout) {
    _pushToUndo();
    List<CollageImage?> newImages = List.filled(layout, null);
    for (int i = 0; i < layout && i < _state.images.length; i++) {
      newImages[i] = _state.images[i];
    }
    _state = _state.copyWith(layout: layout, images: newImages);
    notifyListeners();
  }

  /// 设置指定位置的图片路径
  void setImage(int index, String url) {
    _pushToUndo();
    List<CollageImage?> newImages = List.from(_state.images);
    newImages[index] = CollageImage(id: DateTime.now().toString(), url: url);
    _state = _state.copyWith(images: newImages);
    notifyListeners();
  }

  /// 更新图片的变换参数（位置、缩放、旋转）
  void updateImageTransform(int index, {Offset? position, double? scale, double? rotation}) {
    _pushToUndo();
    List<CollageImage?> newImages = List.from(_state.images);
    if (newImages[index] != null) {
      newImages[index] = newImages[index]!.copyWith(
        position: position,
        scale: scale,
        rotation: rotation,
      );
    }
    _state = _state.copyWith(images: newImages);
    notifyListeners();
  }

  /// 添加贴纸
  void addSticker(String type, String content) {
    _pushToUndo();
    List<Sticker> newList = List.from(_state.stickers);
    newList.add(Sticker(id: DateTime.now().toString(), type: type, content: content));
    _state = _state.copyWith(stickers: newList);
    notifyListeners();
  }

  /// 更新贴纸的变换参数
  void updateSticker(String id, {Offset? position, double? scale, double? rotation}) {
    _pushToUndo();
    List<Sticker> newList = _state.stickers.map((s) {
      if (s.id == id) {
        return s.copyWith(position: position, scale: scale, rotation: rotation);
      }
      return s;
    }).toList();
    _state = _state.copyWith(stickers: newList);
    notifyListeners();
  }

  /// 设置背景
  void setBackground(CollageBackground bg) {
    _pushToUndo();
    _state = _state.copyWith(background: bg);
    notifyListeners();
  }

  /// 撤销操作
  void undo() {
    if (_undoStack.isNotEmpty) {
      _redoStack.add(_state);
      _state = _undoStack.removeLast();
      notifyListeners();
    }
  }

  /// 重做操作
  void redo() {
    if (_redoStack.isNotEmpty) {
      _undoStack.add(_state);
      _state = _redoStack.removeLast();
      notifyListeners();
    }
  }
}
