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
		'registerBuiltin': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.world.level.dimension.DimensionType',
				'methodName': 'm_63926_',
				'methodDesc': '(Lnet/minecraft/core/RegistryAccess$RegistryHolder;)Lnet/minecraft/core/RegistryAccess$RegistryHolder;'
			},
			'transformer': registerBuiltin
		}
	}	
}

function registerBuiltin(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 0));
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/DimensionTypeHooks', 'registerDimensionTypes', '(Lnet/minecraft/core/RegistryAccess$RegistryHolder;)V'));
	ASMAPI.log('INFO', '[Structure Gel] Transformed DimensionType.registerBuiltin');
	return method;
}
