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
		'loadLevel': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.server.MinecraftServer',
				'methodName': 'm_130006_',
				'methodDesc': '()V'
			},
			'transformer': loadLevel
		}
	}	
}

function loadLevel(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 0)); // load this
	instructions.insertBefore(insn, new FieldInsnNode(Opcodes.GETFIELD, 'net/minecraft/server/MinecraftServer', ASMAPI.mapField('f_129749_'), 'Lnet/minecraft/world/level/storage/WorldData;')); // load worldData
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 0)); // load this
	instructions.insertBefore(insn, new FieldInsnNode(Opcodes.GETFIELD, 'net/minecraft/server/MinecraftServer', ASMAPI.mapField('f_129746_'), 'Lnet/minecraft/core/RegistryAccess$RegistryHolder;')); // load registryHolder
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/MinecraftServerHooks', 'registerDimensions', '(Lnet/minecraft/world/level/storage/WorldData;Lnet/minecraft/core/RegistryAccess;)V'));
	ASMAPI.log('INFO', '[Structure Gel] Transformed MinecraftServer.loadLevel');
	return method;
}
