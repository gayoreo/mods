var Opcodes = Java.type('org.objectweb.asm.Opcodes');
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');

var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
// /clone ~ 0 ~ ~100 100 ~100 ~ 100 ~ replace move
function initializeCoreMod() {
	return {
		'clone': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.server.commands.CloneCommands',
				'methodName': 'm_136735_',
				'methodDesc': '(Lnet/minecraft/commands/CommandSourceStack;Lnet/minecraft/core/BlockPos;Lnet/minecraft/core/BlockPos;Lnet/minecraft/core/BlockPos;Ljava/util/function/Predicate;Lnet/minecraft/server/commands/CloneCommands$Mode;)I'
			},
			'transformer': clone
		}
	}	
}

function clone(method) {
	var instructions = method.instructions;
	
	for (var index = 0; index < instructions.size(); index++)
	{
		var insn = instructions.get(index);
		if (insn instanceof VarInsnNode && insn.getOpcode() == Opcodes.ISTORE && insn.var == 9)
		{
			instructions.insert(insn, new VarInsnNode(Opcodes.ISTORE, 9));
			instructions.insert(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/CloneCommandsHooks', 'exceedLimit', '(ILnet/minecraft/commands/CommandSourceStack;)I'));
			instructions.insert(insn, new VarInsnNode(Opcodes.ALOAD, 0));
			instructions.insert(insn, new VarInsnNode(Opcodes.ILOAD, 9));
			ASMAPI.log('INFO', '[Structure Gel] Transformed CloneCommands.clone');
			return method;
		}
	}

	return method;
}
