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
		'entityInside': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.world.level.block.EndPortalBlock',
				'methodName': 'm_7892_',
				'methodDesc': '(Lnet/minecraft/world/level/block/state/BlockState;Lnet/minecraft/world/level/Level;Lnet/minecraft/core/BlockPos;Lnet/minecraft/world/entity/Entity;)V'
			},
			'transformer': entityInside
		}
	}	
}

function entityInside(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 4)); // load entity
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/EndPortalBlockHooks', 'onCollide', '(Lnet/minecraft/world/entity/Entity;)V'));
	ASMAPI.log('INFO', '[Structure Gel] Transformed EndPortalBlock.entityInside');
	return method;
}
