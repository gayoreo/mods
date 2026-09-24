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
		'fillBlocks': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.server.commands.FillCommand',
				'methodName': 'm_137385_',
				'methodDesc': '(Lnet/minecraft/commands/CommandSourceStack;Lnet/minecraft/world/level/levelgen/structure/BoundingBox;Lnet/minecraft/commands/arguments/blocks/BlockInput;Lnet/minecraft/server/commands/FillCommand$Mode;Ljava/util/function/Predicate;)I'
			},
			'transformer': fillBlocks
		}
	}	
}

function fillBlocks(method) {
	var instructions = method.instructions;
	
	for (var index = 0; index < instructions.size(); index++)
	{
		var insn = instructions.get(index);
		if (insn instanceof VarInsnNode && insn.getOpcode() == Opcodes.ISTORE && insn.var == 5)
		{
			// Backwards since we use insert

			instructions.insert(insn, new VarInsnNode(Opcodes.ISTORE, 5));
			instructions.insert(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/FillCommandHooks', 'exceedLimit', '(ILnet/minecraft/commands/CommandSourceStack;)I'));
			instructions.insert(insn, new VarInsnNode(Opcodes.ALOAD, 0)); // Load context
			instructions.insert(insn, new VarInsnNode(Opcodes.ILOAD, 5)); // Load limit
			ASMAPI.log('INFO', '[Structure Gel] Transformed FillCommand.fillBlocks');
			return method;
		}
	}

	return method;
}
