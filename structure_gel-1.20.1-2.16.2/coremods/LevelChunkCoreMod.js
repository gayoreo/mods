var Opcodes = Java.type('org.objectweb.asm.Opcodes');
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');

var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');

function initializeCoreMod() {
	return {
		'getHeight': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.world.level.chunk.LevelChunk',
				'methodName': 'm_5885_',
				'methodDesc': '(Lnet/minecraft/world/level/levelgen/Heightmap$Types;II)I'
			},
			'transformer': getHeight
		}
	}	
}

function getHeight(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 1));
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/LevelChunkHooks', 'modifyHeightmapType', '(Lnet/minecraft/world/level/levelgen/Heightmap$Types;)Lnet/minecraft/world/level/levelgen/Heightmap$Types;'));
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ASTORE, 1));
	ASMAPI.log('INFO', '[Structure Gel] Transformed LevelChunk.getHeight');
	return method;
}
